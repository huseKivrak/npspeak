import React from 'react';
import { iconMap } from '@/lib/iconMap';

interface RenderIconProps {
  iconName: string;
  className?: string;
  [ key: string ]: any;
}

export const RenderIcon: React.FC<RenderIconProps> = ({
  iconName,

  className,
  ...props
}) => {
  const IconComponent = iconMap[ iconName ];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap.`);
    return null;
  }

  return (
    <IconComponent
      className={className}
      {...props}
    />
  );
};