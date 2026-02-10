import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { Bun, NPM, Pnpm, Yarn } from '../ui/tech-icons';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export default function PkgInstallerTabs({
    command,
    pkgList = ['npm', 'pnpm', 'yarn', 'bun'],
}: {
    command: string;
    pkgList?: PackageManager[];
}) {
    return (
        <Tabs defaultValue={pkgList[0]}>
            <TabsList>
                {pkgList.map((pkg) => (
                    <TabsTrigger value={pkg} key={pkg}>
                        {getIconByPkg(pkg)}
                        {pkg}
                    </TabsTrigger>
                ))}
            </TabsList>
            {pkgList.map((pkg) => (
                <TabsContent value={pkg} key={pkg}>
                    <DynamicCodeBlock lang="shell" code={getInstallCommand(pkg, command)} />
                </TabsContent>
            ))}
        </Tabs>
    );
}

function getInstallCommand(pkg: PackageManager, command: string) {
    switch (pkg) {
        case 'npm':
            return `npm install ${command}`;
        case 'pnpm':
            return `pnpm add ${command}`;
        case 'yarn':
            return `yarn add ${command}`;
        case 'bun':
            return `bun add ${command}`;
    }
}

function getIconByPkg(pkg: PackageManager) {
    switch (pkg) {
        case 'npm':
            return <NPM />;
        case 'pnpm':
            return <Pnpm />;
        case 'yarn':
            return <Yarn />;
        case 'bun':
            return <Bun />;
    }
}