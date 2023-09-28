import type { Input, Options } from 'ky/distribution/types/options';

import ky from 'ky';

import { getToken } from '.';

const kyOptions = (isBlob?: boolean) => {
  const options: Options = {
    hooks: {
      beforeRequest: [
        (request) => {
          const token = getToken();

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        },
      ],
      beforeError: [
        (error) => {
          const response = error.response;

          // TODO: 具体接口再修改
          if (!response.ok) {
            console.log(`${response.status}:${response.statusText}`);
          }

          return error;
        },
      ],
      afterResponse: isBlob
        ? undefined
        : [
            async (_request, _options, response) => {
              if (!response.ok) {
                return response;
              }

              const result = await response.json();

              // FIXME: 根据实际项目修改，有些项目会嵌套
              // { data: T, status: '200' }
              // 这种形式返回
              return new Response(
                JSON.stringify(result?.data ?? result),
                response
              );
            },
          ],
    },
  };

  return options;
};

const getPrefixUrl = (url: Input) => {
  const urlToString = url.toString();
  const isURLHasPrefixURL =
    urlToString.startsWith('http:') || urlToString.startsWith('https:');

  // FIXME: 替换 api 地址
  return isURLHasPrefixURL ? undefined : 'https://jsonplaceholder.typicode.com';
};

export const request = async <T>(url: Input, options?: Options) => {
  const resp = await ky(url, {
    prefixUrl: getPrefixUrl(url),
    ...kyOptions(),
    ...options,
  });

  return await resp.json<T>();
};

export const blobRequest = async (url: Input, options?: Options) => {
  const resp = await ky(url, {
    prefixUrl: getPrefixUrl(url),
    ...kyOptions(true),
    ...options,
  });

  return await resp.blob();
};
