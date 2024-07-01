const formateMeetingID = (meeting_id: string) => {
    const part1 = meeting_id.substring(0,3)
    const part2 = meeting_id.substring(3,6)
    const part3 = meeting_id.substring(6)

    return `${part1}-${part2}-${part3}`
}

export default formateMeetingID