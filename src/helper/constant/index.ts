
interface SwipeableTemporaryDrawerProps {
    anchor: string,
    children: React.ReactNode
}

export type LangSyntax = "typescript" | "ecmascript";
export const LangSyntax = {
    typescript: "typescript",
    ecmascript: "ecmascript",
};
export const Bundler = [
    "SWC",
    "ESBUILD"
]

export enum CommonNavOptions  {
    ThemeToggle = 'ThemeToggle',
    Languages = 'Languages',
    SideOptions = 'SideOptions',
}

