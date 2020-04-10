const utils = {};

/**
 * @function skipFeathersInternalCall
 * @summary Given a context checks wheter the call is a request or a feathers
 * intenal call.
 * @param {Object} context A before hook context.
 * @returns {Object} A before hook context.
 */
utils.skipFeathersInternalCall = (context) => {
  if(!context.params.provider) {
    return context;
  }
};

/**
 * @function searchRegex
 * @summary Given a context it generates regexes to search in Mongo as
 * if it where a %LIKE% query in SQL. Name of the desired search property
 * needs to be prepended by the word search. This can be used only in String
 * fields
 * @param {Object} context An after hook context.
 * @returns A context with it's params.query modified.
 */
utils.likeRegex = (context) => {
  const query = context.params.query;
  for (let field in query) {
    if(query[field] && field.indexOf('search') == 0 && field.indexOf('$') == -1) {
      query[field.replace('search', '')] = { $regex: new RegExp(diacritic(query[field]), "i") };
      query[field] = null;
    }
  }
  context.params.query = query;
  return context;
};

const chars = [
  'AaÁáÀàÂâÄäAĄąȺⱥǍǎȦȧẠạĀāÃãå',
  'CcĆćĈĉÇçȻȼČčĊċ',
  'EeÉéÈèÊêËëȨȩĘęɆɇĚěĖėẸẹĒēẼẽ',
  'IiÍíÌìÎîÏïĮįƗɨǏǐİiỊịĪīĨĩ',
  'JjĴĵɈɉǰ',
  'LlĹĺĻļŁłȽƚĽľḶḷ',
  'NnŃńǸǹŅņꞤꞥŇňṅṆṇÑñ',
  'OoÓóÒòÔôÖöǪǫØøƟɵǑǒȮȯỌọŌōÕõ',
  'SsŚśŜŝŞşꞨꞩŠšṠṡṢṣ',
  'TtẗŢţȾⱦŦŧŤťṪṫṬṭ',
  'UuÚúÙùÛûÜüŲųɄʉǓǔỤụŪūŨũ',
  'YyÝýỲỳŶŷŸÿɎɏẎẏỴỵȲȳỸỹ',
  'ZzŹźẐẑƵƶŽžŻżẒẓ'
];

function escapeRegExp(string) {
  return string.replace(/([.*+?^${}()|[]\/\\])/g, '\\$1');
}

const diacritic = function(text) {
  if (!text) return '';
  var result = escapeRegExp(text);
  for (var i = 0; i < chars.length; i++) {
    result = result.replace(new RegExp('[' + chars[i] + ']', 'gi'), '[' + chars[i] + ']');
  }
  return result;
};

module.exports = utils;
