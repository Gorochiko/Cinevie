interface PieSliceProps {
    cx: number
    cy: number
    r: number
    startAngle: number
    endAngle: number
    fill: string
  }
  
  export function PieSlice({ cx, cy, r, startAngle, endAngle, fill }: PieSliceProps) {
    // Convert angles from degrees to radians
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
  
    // Calculate the coordinates
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
  
    // Determine if the arc should be drawn as a large arc
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  
    // Create the path for the pie slice
    const pathData = [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2}`, "Z"].join(" ")
  
    return <path d={pathData} fill={fill} />
  }
  
  