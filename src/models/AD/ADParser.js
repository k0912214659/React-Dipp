class ADParser {
  constructor(canvas) {
    this.canvasRef = canvas;
    this.canvasDefSetting = {
      width: 10,
      height: 10,
    };
    this.adObject = null;
    this.setCanvasWidthHeigh(this.canvasDefSetting.width, this.canvasDefSetting.height);
  }

  async initializeAD(adObject) {
    const {
      ad,
      images,
    } = adObject;
    this.setAdObject(adObject);
    this.setCanvasWidthHeigh({
      width: ad.dimensions[0],
      height: ad.dimensions[1],
    });
    await this.drawCanvasBackground({
      ad,
      images,
    });
    await this.drawText({ ad });
    await this.drawCanvasLogo({ ad });
  }

  setCanvasWidthHeigh({
    width,
    height,
  } = {
    width: this.canvasDefSetting.width,
    height: this.canvasDefSetting.height,
  }) {
    this.canvasRef.width = width;
    this.canvasRef.height = height;
  }

  setAdObject(newAdObject) {
    this.adObject = newAdObject;
  }

  async drawCanvasBackground({
    ad,
    images,
  } = {
    width: this.canvasDefSetting.width,
    height: this.canvasDefSetting.height,
    images: {},
  }) {
    const comp = this;
    return new Promise((resolve) => {
      const ctx = comp.canvasRef.getContext('2d');
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous');
      img.onload = () => {
        ctx.drawImage(img, 0, 0, images[ad.img_hash].width, images[ad.img_hash].height);
        resolve('success');
      };
      img.src = images[ad.img_hash].resource;
    });
  }

  async drawCanvasLogo({ ad }) {
    const comp = this;
    return new Promise((resolve) => {
      const { logo } = ad;
      const { box } = logo;
      const ctx = comp.canvasRef.getContext('2d');
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous');
      img.onload = () => {
        ctx.drawImage(img, box.coordinates.x, box.coordinates.y, box.coordinates.width, box.coordinates.height);
        resolve('success');
      };
      img.src = logo.logo_resource;
    });
  }

  async drawText({ ad }) {
    const { copys } = ad;
    const ctx = this.canvasRef.getContext('2d');
    if (Array.isArray(copys)) {
      for (let i = 0; i < copys.length; i += 1) {
        ctx.fillStyle = copys[i].text_color;
        const font = new FontFace(copys[i].font.family, `url('data:font/opentype;base64,${copys[i].font.url}')`);
        /* eslint-disable-next-line */
        await font.load();
        document.fonts.add(font);
        document.body.classList.add('fonts-loaded');
        copys[i].splits.forEach((text) => {
          ctx.font = `${text.size}px ${copys[i].font.family}`;
          ctx.fillText(text.content, text.x, text.y);
        });
      }
    }
  }

  async exportCanvas() {
    const { ad, images } = this.adObject;
    const ctx = this.canvasRef;
    const body = document.getElementById('root');
    const cropImageLink = document.createElement('a');
    body.append(cropImageLink);
    cropImageLink.setAttribute('id', 'cropImageLink');
    const link = document.getElementById('cropImageLink');
    link.setAttribute('href', ctx.toDataURL(images[ad.img_hash].mime_type).replace('image/png', 'image/octet-stream'));
    link.setAttribute('download', 'dipp.png');
    link.click();
    cropImageLink.remove();
  }

  clearCanvas() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.setCanvasWidthHeigh();
    this.canvasObject = null;
    document.body.classList.remove('fonts-loaded');
  }
}

export default ADParser;
