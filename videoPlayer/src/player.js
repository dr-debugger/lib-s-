export default class VideoPlayer {
  constructor(object) {
    Object.entries(object).forEach(([key, value]) => {
      this[key] = value
    })
  }

  createDomRef(domRef) {
    this.ref = document.getElementById(`${domRef}`)
    this.videoTag = document.createElement("video")
    this.videoSource = document.createElement("source")

    // entering values
    this.videoSource.setAttribute("src", this.videoSrc)
    this.videoTag.setAttribute("controls", true)
    this.videoTag.classList.add("video_player")
    if (this.thumbnail) {
      this.videoTag.setAttribute("poster", this.thumbnail)
    }

    this.injectTag()
  }

  injectTag() {
    this.videoTag.appendChild(this.videoSource)
    this.ref.appendChild(this.videoTag)
  }

  showPlayer() {}

  pause() {}
  play() {}
}
