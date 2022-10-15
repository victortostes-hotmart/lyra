import TypoTolerantSearchBench from './typo-tolerant-search.mjs';
import TokenizerBench from './tokenizer.mjs';

async function benchs () {
  await TypoTolerantSearchBench();
  await TokenizerBench();
}

benchs();
