/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
