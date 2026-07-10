import dns from "node:dns";
import { promises as dnsPromises } from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

try {
  const records = await dnsPromises.resolveSrv(
    "_mongodb._tcp.cluster0.iufi3nq.mongodb.net"
  );
  console.log(records);
} catch (err) {
  console.error(err);
}