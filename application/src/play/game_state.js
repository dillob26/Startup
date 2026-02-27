export class Game_State {
    static Not_Started = new Game_State('not_started')
    static Running = new Game_State('running')
    static Game_Over = new Game_State('game_over')
    
    constructor(name) {
        this.name = name;
    }
}