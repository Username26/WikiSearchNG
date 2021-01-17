$topics = Get-Content .\Wikipedia_topics\wikitop.txt
$counter = 0;
echo hi
foreach($topic in $topics)
    {
        $counter++
        if($counter -ne 19) {continue}
        echo $topic
        $counter = 0
        Start-Process -Wait download.pyw $topic
    }