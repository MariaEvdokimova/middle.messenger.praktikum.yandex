import { Block } from "./Block";

export const render = (query: string, block: Block<any>) => {
    const root = document.getElementById(query);
    root!.append(block.getContent()!);
    return root;
}
