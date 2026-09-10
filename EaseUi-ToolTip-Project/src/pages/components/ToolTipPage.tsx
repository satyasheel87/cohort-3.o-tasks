import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { ToolTip } from "@/components";

const TooltipPage = () => {
  const basicCode = `<ToolTip content="This is a tooltip">
  <button>Hover me</button>
</ToolTip>`;

  const positionsCode = `<div className="flex gap-8">
  <ToolTip content="Top tooltip" position="top">
    <button>Top</button>
  </ToolTip>

  <ToolTip content="Bottom tooltip" position="bottom">
    <button>Bottom</button>
  </ToolTip>

  <ToolTip content="Left tooltip" position="left">
    <button>Left</button>
  </ToolTip>

  <ToolTip content="Right tooltip" position="right">
    <button>Right</button>
  </ToolTip>
</div>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "undefined",
      description: "Content displayed inside the tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Position of the tooltip",
    },
    {
      prop: "delay",
      type: "number",
      default: "200",
      description: "Delay before showing the tooltip",
    },
    {
      prop: "className",
      type: "string",
      default: '""',
      description: "Custom styles for the tooltip",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "undefined",
      description: "Element that triggers the tooltip",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>

        <p className="text-gray-600 text-lg">
          A reusable tooltip component that displays helpful information on
          hover or focus.
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Basic Tooltip</h3>

          <ComponentDemo code={basicCode}>
            <ToolTip content="This is a tooltip">
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
                Hover me
              </button>
            </ToolTip>
          </ComponentDemo>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Positions</h3>

          <ComponentDemo code={positionsCode}>
            <div className="flex flex-wrap justify-center gap-12">
              <ToolTip content="Tooltip on top" position="top">
                <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                  Top
                </button>
              </ToolTip>

              <ToolTip content="Tooltip on bottom" position="bottom">
                <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                  Bottom
                </button>
              </ToolTip>

              <ToolTip content="Tooltip on left" position="left">
                <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                  Left
                </button>
              </ToolTip>

              <ToolTip content="Tooltip on right" position="right">
                <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                  Right
                </button>
              </ToolTip>
            </div>
          </ComponentDemo>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;