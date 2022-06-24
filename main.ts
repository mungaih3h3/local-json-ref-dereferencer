import { Resolver } from "@stoplight/json-ref-resolver";
import fs from "fs/promises";

//script to dereference $ref pointers in json docs - made for aws resource schemas
async function main(directory: string) {
  const fileNames = await fs.readdir(directory);

  for (const fileName of fileNames) {
    const contents = await fs.readFile(directory + fileName, {
      encoding: "utf-8",
    });

    const resolver = new Resolver();
    const resolved = await resolver.resolve(JSON.parse(contents));
    await fs.writeFile(
      directory + "dereferenced-" + fileName,
      JSON.stringify(resolved.result)
    );
  }
}

main(process.argv[2]);
