import { Badge } from './ui/badge'
import {
  SiPython,
  SiPostgresql,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiDocker,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { DiJava } from 'react-icons/di'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  Java: DiJava,
  Python: SiPython,
  SQL: SiPostgresql,
  TypeScript: SiTypescript,
  React: SiReact,
  'Node.js': SiNodedotjs,
  Azure: VscAzure,
  Git: SiGit,
  Docker: SiDocker,
}

interface TechBadgeProps {
  name: string
}

export function TechBadge({ name }: TechBadgeProps) {
  const Icon = iconMap[name]

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1.5 whitespace-nowrap"
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{name}</span>
    </Badge>
  )
}
