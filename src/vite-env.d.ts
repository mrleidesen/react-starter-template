/// <reference types="vite/client" />

/**
 * 配置 env 的类型
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
