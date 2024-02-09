import data from "./data.json";

console.log(data);
const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api") {
      const query = url.searchParams.get("s") || "";
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(query)
      );

      if (!query) {
        const res = Response.json([]);
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        return res;
      }

      const res = Response.json(filteredData);
      res.headers.set("Access-Control-Allow-Origin", "*");
      res.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      return res;
    }
  },
});
console.log(`Listening on http://localhost:${server.port} ...`);
