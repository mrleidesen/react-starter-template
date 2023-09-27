import type { TUser } from '@/types';

import { request } from '@/utils/request';

/**
 * FIXME:
 * 简单做个 request 类型返回示例
 * 不存在实际 api 地址
 */
export async function getUsers() {
  return await request<TUser[]>('users');
}
