type TimeSlot = {
  start: string
  end: string
}

type DaySchedule = {
  isOpen: boolean
  timeSlots?: TimeSlot[]
}

type WeekSchedule = {
  monday?: DaySchedule
  tuesday?: DaySchedule
  wednesday?: DaySchedule
  thursday?: DaySchedule
  friday?: DaySchedule
  saturday?: DaySchedule
  sunday?: DaySchedule
}

type ScheduledContent = {
  isActive: boolean
  monday?: DaySchedule
  tuesday?: DaySchedule
  wednesday?: DaySchedule
  thursday?: DaySchedule
  friday?: DaySchedule
  saturday?: DaySchedule
  sunday?: DaySchedule
}

export function buildWeekSchedule(content: ScheduledContent) {
  return [
    { day: 'Monday', dayNumber: 1, ...content.monday },
    { day: 'Tuesday', dayNumber: 2, ...content.tuesday },
    { day: 'Wednesday', dayNumber: 3, ...content.wednesday },
    { day: 'Thursday', dayNumber: 4, ...content.thursday },
    { day: 'Friday', dayNumber: 5, ...content.friday },
    { day: 'Saturday', dayNumber: 6, ...content.saturday },
    { day: 'Sunday', dayNumber: 0, ...content.sunday },
  ]
}

export function shouldShowContent(schedule: ReturnType<typeof buildWeekSchedule>): boolean {
  const now = new Date()
  const currentDayNumber = now.getDay()
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`
  
  const todaySchedule = schedule.find(day => day.dayNumber === currentDayNumber)
  
  if (!todaySchedule || !todaySchedule.isOpen) {
    return false
  }
  
  // Check if current time falls within any time slot
  if (todaySchedule.timeSlots) {
    for (const slot of todaySchedule.timeSlots) {
      const slotStart = slot.start.length === 5 ? `${slot.start}:00` : slot.start
      const slotEnd = slot.end.length === 5 ? `${slot.end}:00` : slot.end
      
      if (currentTime >= slotStart && currentTime < slotEnd) {
        return true
      }
    }
  }
  
  return false
}

export function getNextOpeningTime(schedule: ReturnType<typeof buildWeekSchedule>): Date | null {
  const now = new Date()
  const currentDayNumber = now.getDay()
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`
  
  // Check if we can open later today
  const todaySchedule = schedule.find(day => day.dayNumber === currentDayNumber)
  if (todaySchedule && todaySchedule.isOpen && todaySchedule.timeSlots) {
    for (const slot of todaySchedule.timeSlots) {
      const slotStart = slot.start.length === 5 ? `${slot.start}:00` : slot.start
      
      if (currentTime < slotStart) {
        const [hours, minutes] = slotStart.split(':')
        const nextOpen = new Date()
        nextOpen.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        return nextOpen
      }
    }
  }
  
  // Find next opening day
  for (let i = 1; i <= 7; i++) {
    const nextDayNumber = (currentDayNumber + i) % 7
    const nextDay = schedule.find(day => day.dayNumber === nextDayNumber)
    
    if (nextDay && nextDay.isOpen && nextDay.timeSlots && nextDay.timeSlots.length > 0) {
      const slotStart = nextDay.timeSlots[0].start
      const [hours, minutes] = slotStart.split(':')
      const nextOpen = new Date()
      nextOpen.setDate(nextOpen.getDate() + i)
      nextOpen.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      return nextOpen
    }
  }
  
  return null
}

export function getClosingTime(schedule: ReturnType<typeof buildWeekSchedule>): Date | null {
  const now = new Date()
  const currentDayNumber = now.getDay()
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`
  
  const todaySchedule = schedule.find(day => day.dayNumber === currentDayNumber)
  
  if (todaySchedule && todaySchedule.isOpen && todaySchedule.timeSlots) {
    for (const slot of todaySchedule.timeSlots) {
      const slotStart = slot.start.length === 5 ? `${slot.start}:00` : slot.start
      const slotEnd = slot.end.length === 5 ? `${slot.end}:00` : slot.end
      
      if (currentTime >= slotStart && currentTime < slotEnd) {
        const [hours, minutes] = slotEnd.split(':')
        const closingTime = new Date()
        closingTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        return closingTime
      }
    }
  }
  
  return null
}

export function isContentActive(content: ScheduledContent): boolean {
  if (!content.isActive) {
    return true
  }
  
  const schedule = buildWeekSchedule(content)
  return shouldShowContent(schedule)
}