/**
 * ADAPTER PATTERN
 * 
 * Definition:
 * The Adapter pattern allows objects with incompatible interfaces to work together.
 * It acts as a bridge between two incompatible interfaces by wrapping an existing
 * class with a new interface.
 * 
 * When to Use:
 * - Integrate third-party libraries with incompatible interfaces
 * - Work with legacy code that can't be modified
 * - Make classes with different interfaces collaborate
 * - Reuse existing classes that don't match required interface
 * 
 * Benefits:
 * ✅ Enables collaboration between incompatible classes
 * ✅ Separates interface conversion logic from business logic
 * ✅ Open/Closed Principle compliance
 * ✅ Single Responsibility Principle
 * 
 * Drawbacks:
 * ❌ Increases code complexity with new interfaces and classes
 * ❌ Sometimes it's simpler to change the service class directly
 * 
 * Key Components:
 * 1. Target Interface - defines the domain-specific interface used by Client
 * 2. Adaptee - existing class with incompatible interface
 * 3. Adapter - implements Target interface and wraps Adaptee
 * 4. Client - uses objects through Target interface
 * 
 * Real-world Examples:
 * - Power adapters for different electrical standards
 * - Database drivers (MySQL, PostgreSQL adapters for common interface)
 * - Payment gateways (adapting different APIs to common interface)
 * - Media players (supporting different file formats)
 * - API wrappers (REST to GraphQL adapters)
 */

// Target interface - defines the interface that Client expects to work with
// This is the common interface that all adapters must implement
interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

/**
 * Adaptees - existing classes with incompatible interfaces
 * 
 * These classes already exist and have their own specific interfaces.
 * We can't modify them (perhaps they're third-party libraries or legacy code),
 * but we need to use them through our MediaPlayer interface.
 */

class Mp3Player {
  /**
   * MP3 player with its own specific interface
   * Note: method name is different from what MediaPlayer expects
   */
  playMp3(fileName: string): void {
    console.log(`🎵 Playing MP3 file: ${fileName}`);
    // MP3-specific logic: decode MP3, adjust audio levels, etc.
  }
}

class Mp4Player {
  /**
   * MP4 player with its own specific interface
   * Different method name and potentially different behavior
   */
  playMp4(fileName: string): void {
    console.log(`🎬 Playing MP4 file: ${fileName}`);
    // MP4-specific logic: decode video, sync audio, display subtitles, etc.
  }
}

class VlcPlayer {
  /**
   * VLC player with its own specific interface
   * Another different method name and behavior
   */
  playVlc(fileName: string): void {
    console.log(`📺 Playing VLC file: ${fileName}`);
    // VLC-specific logic: handle multiple codecs, streaming, etc.
  }
}

/**
 * Adapter - converts the interface of Adaptees to match Target interface
 * 
 * The adapter implements the Target interface and maintains references to
 * the Adaptee objects. It translates calls from the Target interface to
 * the appropriate method calls on the Adaptees.
 */
class MediaAdapter implements MediaPlayer {
  private mp4Player: Mp4Player;
  private vlcPlayer: VlcPlayer;

  constructor() {
    // Initialize the adaptees that this adapter will work with
    this.mp4Player = new Mp4Player();
    this.vlcPlayer = new VlcPlayer();
  }

  /**
   * Implements the Target interface method
   * Translates the call to appropriate Adaptee method based on file type
   * 
   * @param audioType - The type of media file
   * @param fileName - The name of the file to play
   */
  play(audioType: string, fileName: string): void {
    console.log(`MediaAdapter: Handling ${audioType} file...`);
    
    // Adapter logic: route to appropriate player based on type
    switch (audioType.toLowerCase()) {
      case "mp4":
        // Translate MediaPlayer.play() -> Mp4Player.playMp4()
        this.mp4Player.playMp4(fileName);
        break;
      case "vlc":
        // Translate MediaPlayer.play() -> VlcPlayer.playVlc()
        this.vlcPlayer.playVlc(fileName);
        break;
      default:
        console.log(`❌ ${audioType} format not supported by adapter`);
    }
  }
}

/**
 * Client - uses the Target interface to work with different media players
 * 
 * The client doesn't need to know about the specific player implementations.
 * It just uses the common MediaPlayer interface for all operations.
 */
class AudioPlayer implements MediaPlayer {
  private mediaAdapter: MediaAdapter;
  private mp3Player: Mp3Player;

  constructor() {
    this.mediaAdapter = new MediaAdapter();
    this.mp3Player = new Mp3Player();
  }

  /**
   * Main play method that handles all media types
   * Uses direct implementation for MP3, adapter for others
   * 
   * @param audioType - The type of media file
   * @param fileName - The name of the file to play
   */
  play(audioType: string, fileName: string): void {
    console.log(`\n🎮 AudioPlayer: Attempting to play ${audioType} file...`);
    
    // Handle MP3 directly (no adaptation needed)
    if (audioType.toLowerCase() === "mp3") {
      this.mp3Player.playMp3(fileName);
    } else {
      // Use adapter for other formats
      console.log(`Using adapter for ${audioType} format...`);
      this.mediaAdapter.play(audioType, fileName);
    }
  }
}

// Usage Example
const player = new AudioPlayer();

player.play("mp3", "song.mp3");
player.play("mp4", "video.mp4");
player.play("vlc", "movie.vlc");
player.play("avi", "clip.avi"); // Not supported

export { MediaPlayer, AudioPlayer, MediaAdapter, Mp3Player, Mp4Player, VlcPlayer }; 