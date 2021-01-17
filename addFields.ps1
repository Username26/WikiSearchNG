curl.exe -X POST -H 'Content-type:application/json' --data-binary '{
   "add-field-type":{
     "name":"content",
     "class":"solr.TextField",
     "indexAnalyzer":{
        "tokenizer":{
           "class":"solr.ClassicTokenizerFactory"
			},
		"filters":[{
			"class":"solr.LowerCaseFilterFactory"
			},
			{
			"class":"solr.StopFilterFactory"
			},
			{
			"class":"solr.PorterStemFilterFactory"
			}]
		},
     "queryAnalyzer":{
        "tokenizer":{
           "class":"solr.ClassicTokenizerFactory" },
		"filters":[{
			"class":"solr.LowerCaseFilterFactory"},
			{
			"class":"solr.StopFilterFactory"
			},
			{
			"class":"solr.PorterStemFilterFactory"
			}]}}
   "add-field" : {
      "name":"content",
      "type":"content",
	  "indexed":true}
}' http://localhost:8983/solr/wiki/schema