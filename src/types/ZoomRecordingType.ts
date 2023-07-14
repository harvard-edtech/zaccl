/**
 * Type of Zoom recording file/view
 * @author Gabe Abrams
 */
enum ZoomRecordingType {
  SharedScreenWithSpeakerViewAndClosedCaptions = 'shared_screen_with_speaker_view(CC)',
  SharedScreenWithSpeakerView = 'shared_screen_with_speaker_view',
  SharedScreenWIthGalleryView = 'shared_screen_with_gallery_view',
  SpeakerView = 'speaker_view',
  GalleryView = 'gallery_view',
  SharedScreen = 'shared_screen',
  AudioOnly = 'audio_only',
  AudioTranscript = 'audio_transcript',
  ChatFile = 'chat_file',
  ActiveSpeaker = 'active_speaker',
  Poll = 'poll',
  Timeline = 'timeline',
  ClosedCaption = 'closed_caption',
  AudioInterpretation = 'audio_interpretation',
  Summary = 'summary',
  SummaryNextSteps = 'summary_next_steps',
  SummarySmartChapters = 'summary_smart_chapters',
}

export default ZoomRecordingType;
