// import type { AdminDevConfig } from "@medusajs/admin-ui"
// import { dev as devAdmin } from "@medusajs/admin-ui"
import type { AdminDevConfig } from "admin-ui-longvb"
import { dev as devAdmin } from "admin-ui-longvb"

export default async function dev(args: AdminDevConfig) {
  await devAdmin(args)
}
