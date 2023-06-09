import VideoPlayer from "./player.js"

const player = new VideoPlayer({
  videoSrc:
    "https://videos.ctfassets.net/t3z9160esnn3/1KhEXa9x3oWuxdFDzO9ejI/54be59e7e00473cfcf21ff7f8f32b9c5/Pexels_Videos_1580455.mp4",
})

player.createDomRef("video_container")
