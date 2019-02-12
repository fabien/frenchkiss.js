import { expect } from 'chai';
import i18n from '../src/frenchkiss';

describe('locale', () => {
  it('should not bug if no locale', () => {
    expect(i18n.t('test')).to.equal('test');
  });

  it('defaults to empty string', () => {
    expect(i18n.locale()).to.equal('');
  });

  it('gets and sets locale', () => {
    i18n.locale('en');
    expect(i18n.locale()).to.equal('en');

    i18n.locale('fr');
    expect(i18n.locale()).to.equal('fr');
  });

  it('search the translation based on the locale', () => {
    i18n.set('a', { test: 'a' });
    i18n.set('b', { test: 'b' });

    i18n.locale('a');
    expect(i18n.t('test')).to.equal('a');

    i18n.locale('b');
    expect(i18n.t('test')).to.equal('b');
  });
});

describe('fallback', () => {
  afterEach(() => {
    i18n.unset('fallback');
  });

  it('defaults to empty string', () => {
    expect(i18n.fallback()).to.equal('');
  });

  it('gets and sets fallback', () => {
    i18n.fallback('en');
    expect(i18n.fallback()).to.equal('en');

    i18n.fallback('fr');
    expect(i18n.fallback()).to.equal('fr');
  });

  it('search the fallback if translation not found', () => {
    i18n.set('default', { a: 'a' });
    i18n.set('fallback', { a: '1', b: 'b' });

    i18n.locale('default');
    i18n.fallback('fallback');

    expect(i18n.t('a')).to.equal('a');
    expect(i18n.t('b')).to.equal('b');
  });
});

describe('t', () => {
  beforeEach(() => {
    i18n.locale('en');
  });

  it('translates a simple string', () => {
    i18n.set('en', {
      hello: 'Hello',
    });

    expect(i18n.t('hello')).to.equal('Hello');
  });

  it('interpolates', () => {
    i18n.set('en', {
      hello: 'Hi {name1} and {name2} !',
    });

    expect(
      i18n.t('hello', {
        name1: 'Vince',
        name2: 'Anna',
      })
    ).to.equal('Hi Vince and Anna !');
  });

  it('interpolates with specified language (argument 3)', () => {
    i18n.set('fr', {
      hello: 'Bonjour {name1} et {name2} !',
    });

    expect(
      i18n.t(
        'hello',
        {
          name1: 'Vince',
          name2: 'Anna',
        },
        'fr'
      )
    ).to.equal('Bonjour Vince et Anna !');
  });

  it('interpolates with empty string if no parameter specified', () => {
    i18n.set('en', {
      hello: 'Hi {name1} and {name2} !',
    });

    expect(i18n.t('hello')).to.equal('Hi  and  !');
  });

  it('interpolates the same placeholder multiple times', () => {
    i18n.set('en', {
      hello: 'Hi {name} and {name} !',
    });

    expect(i18n.t('hello', { name: 'Vince' })).to.equal('Hi Vince and Vince !');
  });

  it('interpolates plural', () => {
    i18n.set('en', {
      some_cats:
        'There {N,plural,=0{is no cat} =1{is one cat} other{are {N} cats}} here.',
    });

    expect(i18n.t('some_cats', { N: 0 })).to.equal('There is no cat here.');
    expect(i18n.t('some_cats', { N: 1 })).to.equal('There is one cat here.');
    expect(i18n.t('some_cats', { N: 8 })).to.equal('There are 8 cats here.');
  });

  it('interpolates select', () => {
    i18n.set('en', {
      love_pet:
        'I love my {type,select,dog{good boy} cat{evil cat} other {pet}}.',
    });

    expect(i18n.t('love_pet', { type: 'dog' })).to.equal('I love my good boy.');
    expect(i18n.t('love_pet', { type: 'cat' })).to.equal('I love my evil cat.');
    expect(i18n.t('love_pet', { type: '...' })).to.equal('I love my pet.');
  });

  it('interpolate with spaces', () => {
    i18n.set('en', {
      hello:
        'Hello { \t\r\n  N \t\r\n ,  \t\r\n  plural \t\r\n  , \t\r\n  =0 \t\r\n  {me} \t\r\n  =1 \t\r\n  {you} \t\r\n other \t\r\n {all { \t\r\n N \t\r\n } guys} \t\r\n }.',
    });
    expect(i18n.t('hello', { N: 0 })).to.equal('Hello me.');
    expect(i18n.t('hello', { N: 1 })).to.equal('Hello you.');
    expect(i18n.t('hello', { N: 10 })).to.equal('Hello all 10 guys.');
  });

  it('interpolate without spaces', () => {
    i18n.set('en', {
      hello: 'Hello {N,plural,=0{me}=1{you}other{all {N} guys}}.',
    });
    expect(i18n.t('hello', { N: 0 })).to.equal('Hello me.');
    expect(i18n.t('hello', { N: 1 })).to.equal('Hello you.');
    expect(i18n.t('hello', { N: 10 })).to.equal('Hello all 10 guys.');
  });

  it('interpolate imbricated block', () => {
    i18n.set('en', {
      all_pets_color:
        'All my {animal,select,cat{{color,select,G{grey }other{}}cats}other{{color,select,G{grey }other{}}dogs}}.',
    });

    expect(i18n.t('all_pets_color', { animal: 'cat', color: 'G' })).to.equal(
      'All my grey cats.'
    );
    expect(i18n.t('all_pets_color', { animal: 'dog', color: 'G' })).to.equal(
      'All my grey dogs.'
    );
    expect(i18n.t('all_pets_color', { animal: 'cat' })).to.equal(
      'All my cats.'
    );
    expect(i18n.t('all_pets_color', { animal: 'dog' })).to.equal(
      'All my dogs.'
    );
  });
});

describe('onMissingKey', () => {
  beforeEach(() => {
    i18n.locale('en');
  });

  afterEach(() => {
    i18n.onMissingKey(k => k);
  });

  it('returns the key if translation not found', () => {
    expect(i18n.t('bogus_key')).to.equal('bogus_key');
  });

  it('replace the key with something custom when not found', () => {
    i18n.onMissingKey(key => 'missing:' + key);
    expect(i18n.t('bogus_key')).to.equal('missing:bogus_key');
  });

  it('does not bind empty string', () => {
    i18n.onMissingKey(key => key);
    i18n.set('en', {
      empty: '',
    });
    expect(i18n.t('empty')).to.equal('');
  });
});

describe('set', () => {
  beforeEach(() => {
    i18n.locale('en');
  });

  it('erase the language table', () => {
    i18n.set('en', { a: 'a', OLD_VALUE: 'b' });
    expect(i18n.t('a')).to.equal('a');

    i18n.set('en', { a: '1' });
    expect(i18n.t('a')).to.equal('1');
    expect(i18n.t('OLD_VALUE')).to.equal('OLD_VALUE');
  });

  it('should delete cache keys', () => {
    i18n.set('en', { a: 'a', b: 'b' });
    i18n.t('a');
    i18n.t('b');
    expect(i18n.cache.en.a).to.exist;
    expect(i18n.cache.en.b).to.exist;

    i18n.set('en', { a: 'a' });
    expect(i18n.cache.en.a).to.be.undefined;
    expect(i18n.cache.en.b).to.be.undefined;
  });
});

describe('extend', () => {
  beforeEach(() => {
    i18n.locale('en');
  });

  it('extend the language table', () => {
    i18n.extend('en', { a: 'a' });
    expect(i18n.t('a')).to.equal('a');

    i18n.extend('en', { b: 'b' });
    expect(i18n.t('a')).to.equal('a');
    expect(i18n.t('b')).to.equal('b');
  });

  it('should delete cache of erased keys', () => {
    i18n.extend('en', { a: 'a', b: 'b' });
    i18n.t('a');
    i18n.t('b');
    expect(i18n.cache.en.a).to.exist;
    expect(i18n.cache.en.b).to.exist;

    i18n.extend('en', { a: 'a' });
    expect(i18n.cache.en.a).to.be.undefined;
    expect(i18n.cache.en.b).to.exist;
  });

  it('should set if no cache defined', () => {
    i18n.locale('unused');
    i18n.extend('unused', {
      hello: 'Hello',
    });
    expect(i18n.t('hello')).to.equal('Hello');
  });
});

describe('unset', () => {
  beforeEach(() => {
    i18n.locale('en');
    i18n.set('en', { a: '1' });
  });

  it('should clear table', () => {
    expect(i18n.t('a')).to.equal('1');

    i18n.unset('en');
    expect(i18n.t('a')).to.equal('a');
  });

  it('should clear compiled function', () => {
    i18n.unset('en');
    expect(i18n.cache.en).to.be.undefined;
  });
});

describe('pluralize', () => {
  it('should work', () => {
    let returnType;

    i18n.locale('en');
    i18n.set('en', {
      test:
        '{N,plural,=0{r0}=5{r5}zero{rzero}one{rone}two{rtwo}few{rfew}many{rmany}other{rother}}',
    });
    i18n.plural('en', v => {
      expect(v).to.equal(18);
      return returnType;
    });

    ['zero', 'one', 'two', 'few', 'many', 'other', 'notfound'].forEach(type => {
      returnType = type;
      expect(i18n.t('test', { N: 18 })).to.equal(
        'r' + (returnType === 'notfound' ? 'other' : returnType)
      );
    });

    [0, 5].forEach(N => {
      i18n.plural('en', v => v);
      expect(i18n.t('test', { N })).to.equal('r' + N);
    });
  });
});