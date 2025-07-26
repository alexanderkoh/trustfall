# Trustfall: Vault Wars - Audio Assets

## Folder Structure

### `/music/` - Background Music Tracks
- `main-menu.mp3` - Ambient menu music with faction-based variations
- `story-intro.mp3` - Opening cinematic music (slides 1-3: Earth's peak to AI failure)
- `story-collapse.mp3` - Dark/tense music (slides 4-6: Collapse to Earth-0)
- `story-emergence.mp3` - Hopeful/mysterious music (slides 7-10: Runners to choice)
- `faction-lumina.mp3` - Ethereal, hopeful music for Lumina faction
- `faction-syndicate.mp3` - Dark, powerful music for Shadow Syndicate
- `faction-selection.mp3` - Tension/choice music for faction screen

### `/sfx/` - Sound Effects
#### UI Sounds
- `click.mp3` - General button/UI click sound
- `text-advance.mp3` - Sound when advancing text/slides
- `typing.mp3` - Subtle typewriter sound (optional)
- `hover.mp3` - Subtle hover sound for buttons

#### Story Sounds
- `slide-transition.mp3` - Whoosh/transition between slides
- `faction-select.mp3` - Confirmation sound when choosing faction
- `protocol-start.mp3` - Sound when starting the story
- `loading.mp3` - Subtle loading/initialization sound

#### Ambient Sounds
- `earth-ambience.mp3` - Subtle background ambience for story
- `vault-echo.mp3` - Echo/reverb sound for vault-related slides
- `ai-glitch.mp3` - Glitch sound for AI malfunction slides

## Audio Flow Plan

### Main Menu
- **Music**: `main-menu.mp3` (changes based on selected faction)
- **SFX**: Button clicks, hover sounds

### Story Experience (20 Slides)
- **Slides 1-3**: `story-intro.mp3` + slide transition sounds
- **Slides 4-6**: `story-collapse.mp3` + darker ambience
- **Slides 7-10**: `story-emergence.mp3` + vault/mystery sounds
- **All slides**: Text advancement SFX, typewriter sounds

### Faction Selection
- **Music**: `faction-selection.mp3`
- **Hover SFX**: Different sounds for each faction preview
- **Selection SFX**: Confirmation sound when choosing

### Post-Selection
- **Music**: Changes to selected faction's theme
- **Return to menu**: Faction-specific main menu music

## Implementation Notes
- Use the existing `Soundtrack` component for background music
- Create new `SFXPlayer` component for sound effects
- Ensure audio files are optimized for web (compressed, appropriate bitrates)
- Implement fade-in/fade-out for smooth transitions
- Add audio loading states and error handling 