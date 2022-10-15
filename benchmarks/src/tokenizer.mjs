import cronometro from 'cronometro'
import { create } from '../../dist/cjs/src/lyra.js'
import { formattedEvents } from './utils/dataset.mjs'
import { tokenize, normalizationCache } from "../../dist/cjs/src/tokenizer/index.js";

import { stopWords } from "../../dist/cjs/src/tokenizer/stop-words/index.js";

const LANGUAGE = 'english';

const { tokenizer } = create({
  defaultLanguage: LANGUAGE,
  schema: {}
});

const { tokenizer: tokenizeWithStepWordsConfig } = create({
  schema: {},
  defaultLanguage: LANGUAGE,
  tokenizer: {
    customStopWords: stopWords.english,
  },
});

const eventsDescriptionConcat = formattedEvents
  .slice(0, 1_000)
  .map(({ description}) => description)
  .join('. ');

export default function TokenizerBench() {
  return cronometro({
    'tokenizer': () => {
      tokenize(eventsDescriptionConcat, LANGUAGE, false, tokenizer)
    },
    'tokenizer - with stop-words enabled': () => {
      tokenize(eventsDescriptionConcat, LANGUAGE, false, tokenizeWithStepWordsConfig)
    },
  },
  {
    onTestEnd: () => { normalizationCache.clear() }
  })
}
