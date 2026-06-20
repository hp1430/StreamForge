import {
  fetchAllVideosService,
  fetchVideoByIdService,
  getPlaybackUrlService,
  getVideoStatusService
} from '../services/getVideoService.js';

export const getAllReadyVideos = async (req, res) => {
  try {
    const videos = await fetchAllVideosService();

    return res.status(200).json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching all ready videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
    const video = await fetchVideoByIdService(id);

    return res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPlaybackUrl = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
    const playbackUrl = await getPlaybackUrlService(id);
    return res.status(200).json({
      success: true,
      data: playbackUrl
    });
  } catch (error) {
    console.error('Error fetching playback URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getVideoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
    const videoStatus = await getVideoStatusService(id);
    return res.status(200).json({
      success: true,
      data: { status: videoStatus }
    });
  } catch (error) {
    console.error('Error fetching video status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
