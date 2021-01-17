import requests
import re
import pathlib
import sys
import json

# the program extracts text and image data for a given topic
# and writes them in the CURRENT DIRECTORY, relative to the location the py script is invoked from
# make sure you set it properly, in case you dont want the default one

# this is the title we will search
topic = sys.argv[1]

# this is the config for to get the first introduction of a title
text_config = {
    'action': 'query',
    'format': 'json',
    'titles': topic,
    'prop': 'extracts',
    'exintro': True,
    'explaintext': True,
    'redirects': True,
}
text_response = requests.get('https://en.wikipedia.org/w/api.php',
                             params=text_config).json()
text_page = next(iter(text_response['query']['pages'].values()))

pathlib.Path('dataset').mkdir(parents=True, exist_ok=True)
file1 = open('dataset/' + text_page['title'].replace('"', '') + ".json",
             "w", encoding='utf-8')  # write mode
print(text_page['extract'])
file1.write(
    '[\n\t{\n\t\t\"id\": \"' + text_page['title'] + '\",\n\t\t\"content\": \"' +
    text_page['extract'].replace('"', '\\"') + '\",\n\t\t\"image\": \"' +
    text_page['title'] + '.jpg\"\n\t}\n]'
)
file1.close()
# print(text_page['extract'])

# this is the config to get the images that are in the topic
# we use this to count the number of images
num_image_config = {
    'action': 'parse',
    'pageid': text_page['pageid'],
    'format': 'json',
    'prop': 'images'
}
num_image_response = requests.get('https://en.wikipedia.org/w/api.php',
                                  params=num_image_config).json()

# now that we havae the number of images in the page, we ask for the images that are in the page with the title
image_config = {
    'action': 'query',
    'format': 'json',
    'titles': topic,
    'prop': 'images',
    'imlimit': len(num_image_response['parse']['images']),
    'redirects': True,
}
image_response = requests.get('https://en.wikipedia.org/w/api.php',
                              params=image_config).json()
image_page = next(iter(image_response['query']['pages'].values()))

# and we  write the image files one by one in the currect directory
# we also dont write the svg files, since as they are mostly the logos
# modily the filename_pattern regex for to accept the proper files
print("writing files")

filename_pattern = re.compile(".*\.(?:jpe?g|gif|png|JPE?G|GIF|PNG)")

url_response = requests.get(
    'https://en.wikipedia.org/w/api.php?action=query&redirects&format=json&formatversion=2&prop=pageimages&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=' + topic)

url_page = json.loads(url_response.content)
url_pic = url_page['query']['pages'][0]['thumbnail']['source']

with open('dataset/' + text_page['title'] + ".jpg",
          'wb') as handle:
    response = requests.get(url_pic, stream=True)

    if not response.ok:
        print(response)

    for block in response.iter_content(1024):
        if not block:
            break

        handle.write(block)

# for i in range(len(image_page['images'])):

#     if i == 1:
#         url_config = {
#             'action': 'query',
#             'format': 'json',
#             'titles': image_page['images'][i]['title'],
#             'prop': 'imageinfo',
#             'iiprop': 'url'
#         }
#         url_response = requests.get('https://en.wikipedia.org/w/api.php',
#                                     params=url_config).json()
#         url_page = next(iter(url_response['query']['pages'].values()))
#         print(url_page['imageinfo'][0]['url'])
#         if (filename_pattern.search(url_page['imageinfo'][0]['url'])):

#             print("writing image " +
#                   url_page['imageinfo'][0]['url'].rsplit("/", 1)[1])
#             with open('dataset/' + image_page['title'] + ".jpg",
#                       'wb') as handle:
#                 response = requests.get(url_page['imageinfo'][0]['url'],
#                                         stream=True)

#                 if not response.ok:
#                     print(response)

#                 for block in response.iter_content(1024):
#                     if not block:
#                         break

#                     handle.write(block)
#         break
# ************************************references*******************************************************************
# https://www.mediawiki.org/wiki/API:Parsing_wikitext
# https://www.mediawiki.org/wiki/Extension:TextExtracts#Caveats
# https://stackoverflow.com/questions/58337581/find-image-by-filename-in-wikimedia-commons
# https://en.wikipedia.org/w/api.php?action=query&titles=File:Albert_Einstein_Head.jpg&prop=imageinfo&iiprop=url

# https://stackoverflow.com/questions/24474288/how-to-obtain-a-list-of-titles-of-all-wikipedia-articles
# for all titles
# https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-all-titles-in-ns0.gz
# https://en.wikipedia.org/w/api.php?action=parse&pageid=252735&prop=images
