from transformers import BertForSequenceClassification, BertTokenizer, BertConfig
from transformers import RobertaForSequenceClassification, RobertaTokenizer, RobertaConfig
from transformers import XLNetForSequenceClassification, XLNetTokenizer, XLNetConfig
from transformers import XLMForSequenceClassification, XLMTokenizer, XLMConfig
from transformers import DistilBertForSequenceClassification, DistilBertTokenizer, DistilBertConfig

MODEL_CLASSES = {
    	'bert': (BertForSequenceClassification, BertTokenizer, BertConfig),
        'xlnet': (XLNetForSequenceClassification, XLNetTokenizer, XLNetConfig),
	    'xlm': (XLMForSequenceClassification, XLMTokenizer, XLMConfig),
	    'roberta': (RobertaForSequenceClassification, RobertaTokenizer, RobertaConfig),
		'distilbert': (DistilBertForSequenceClassification, DistilBertTokenizer, DistilBertConfig)}
		        
	model_type = 'roberta'

	model_class, tokenizer_class, config_class = MODEL_CLASSES[model_type]
