import Changelog from "../../../../CHANGELOG.mdx"
import { ReactNode } from "react";
interface CustomComponentProps {
    children: ReactNode;
}
function CustomH1({ children }: CustomComponentProps) {
    return <h2 className="text-2xl text-primary font-semibold">{children}</h2>
}
function CustomH2({ children }: CustomComponentProps) {
    return <h3 className="font-bold text-xl">{children}</h3>
}

function CustomLi({ children }: CustomComponentProps) {
    return <li className="">{children}</li>
}

const overrideComponents = {
    h1: CustomH1,
    h2: CustomH2,
    li: CustomLi,
}
export default function ChangelogComponent() {
    return <div className="flex flex-col gap-2 max-h-[80dvh] overflow-y-auto">
        {/* @ts-ignore */}
        <Changelog components={overrideComponents} />
    </div>
}