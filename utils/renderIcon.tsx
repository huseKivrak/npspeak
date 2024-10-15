import React from 'react';
import { iconMap } from '@/lib/iconMap';
import { cn } from './helpers/clsxMerge';

interface RenderIconProps {
  iconName: string;
  isDialogue?: boolean;
  className?: string;
  [ key: string ]: any;
}

export const RenderIcon: React.FC<RenderIconProps> = ({
  iconName,
  isDialogue = false,
  className,
  ...props
}) => {
  const IconComponent = iconMap[ iconName ];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap.`);
    return null;
  }

  const dialogueColorMap: { [ key: string ]: string; } = {
    greeting: 'text-primary',
    farewell: 'text-danger',
    story: 'text-secondary',
    question: 'text-foreground',
    answer: 'text-success',
    exclamation: 'text-warning',
    other: 'text-default',
  };

  const iconColor = isDialogue ? dialogueColorMap[ iconName ] : '';

  return (
    <IconComponent
      className={cn(className, iconColor)}
      {...props}
    />
  );
};