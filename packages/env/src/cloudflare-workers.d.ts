import type { CloudflareEnv } from "../env";

declare module "cloudflare:workers" {
  export const env: CloudflareEnv;

  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}
