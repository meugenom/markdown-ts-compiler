const CONFIG = {
  rules: {
    '*': 'h1',
    '**': 'h2',
    '***': 'h3',
    '****': 'h4'
  },
  separator: {
    newLine: '\n',
    newSpace: ''
  },

  ImagesPattern: /^!\[(.*?)\]/,
  BracketsPattern: /\[(.*?)\]/,
  BracesPattern: /\((.*?)\)/,
  UnderDashPattern: /^\_(.*?)\_/,
  StrongPattern: /^\*\*(.*?)\*\*/,
  CodePattern: /^\`(.*?)\`$/,
  SearchLinkPattern: /<a href="">(.*?)/,
  UnMarkablePattern: /\\\*\w+\\\*/,

  StartCodePattern: /^\`(.*?)/,
  EndCodePattern: /(.*?)\`$/,
  StartStrongPattern: /^\*\*(.*?)/,
  EndStrongPattern: /(.*?)\*\*/,
  StartBracketsPattern: /\[(.*?)/,
  EndBracketsPattern: /(.*?)\]/,
  StartUnMarkablePattern: /\\\*\w+/,
  EndUnMarkablePattern: /\w+\\\*/,

  datePattern: /date:(.*)/,
  titlePattern: /title:(.*)/,
  templatePattern: /post:(.*)/,
  thumbnailPattern: /thumbnail:(.*)/,
  slugPattern: /slug:(.*)/,
  tagsPattern: /tags:(.*)/,
  categoriesPattern: /categories:(.*)/,

  english: '@en',
  german: '@de',
  russian: '@ru',
  multi: '@all',

  version: '0.0.1rc'
}

export default CONFIG
