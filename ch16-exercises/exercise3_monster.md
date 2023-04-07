A Monster

It is traditional for platform games to have enemies that you can jump on top of
to defeat. This exercise asks you to add such an actor type to the game.

We’ll call it a monster. Monsters move only horizontally. You can make them
move in the direction of the player, bounce back and forth like horizontal
lava, or have any movement pattern you want. The class doesn’t have to handle
falling, but it should make sure the monster doesn’t walk through walls.

When a monster touches the player, the effect depends on whether the player is
jumping on top of them or not. You can approximate this by checking whether the
player’s bottom is near the monster’s top. If this is the case, the monster
disappears. If not, the game is lost.
