module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'airbnb',
    'airbnb-typescript',
  ],
  rules: {
    // 'React' must be in scope when using JSX 에러 해결 (Next.js)
    'react/react-in-jsx-scope': 'off',
    // ts파일에서 tsx구문 허용 (Next.js)
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 2],
    // 함수의 매개변수 개수 제한
    'max-params': ['error', 3],
    // // 함수의 길이 제한
    'max-lines-per-function': ['error', { max: 10 }],
  },
};
