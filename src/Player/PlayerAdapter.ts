export interface PlayerAdapter {
    setPosition(position: number): void
    getPosition(): number
    getDuration(): number
}
