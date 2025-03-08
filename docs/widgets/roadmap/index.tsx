export const Roadmap: React.FC = () => {
  return <div>Roadmap</div>;
};

export interface RoadmapCellProps {
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 是否为里程碑，里程碑会显示在时间轴上
   */
  isMilestone: boolean;
  /**
   * 状态
   */
  status: 'done' | 'doing' | 'todo';
}

export const RoadmapCell: React.FC<RoadmapCellProps> = ({
  title,
  description,
}) => {
  return <div>{title}</div>;
};
