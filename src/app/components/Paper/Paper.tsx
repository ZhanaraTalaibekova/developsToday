import { FC, ReactNode } from 'react';

import { Layout } from 'antd';

import cn from 'classnames';

const { Content } = Layout;

interface PaperProps {
  children: ReactNode;
  className?: string;
}

export const Paper: FC<PaperProps> = ({ children, className }) => (
  <Content className={cn("p-8 rounded-lg bg-white shadow-md", className)}>{children}</Content>
);
