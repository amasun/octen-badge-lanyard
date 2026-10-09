/**
 * Generates dynamic high-resolution badge textures for the 3D Lanyard component.
 * Exact replication of the Octen Black Sleeve ID Badge design.
 */

const MASCOT_SVG_PATH =
  "M23.0596 12.9756C23.5218 12.9758 23.8973 13.3624 23.8975 13.8389V15.2236C23.8975 15.7003 23.5219 16.0877 23.0596 16.0879H21.9658C21.7427 16.0879 21.5299 16.1791 21.373 16.3408L21.123 16.5986C20.9664 16.7615 20.878 16.9804 20.8779 17.209V18.3369C20.8777 18.8135 20.5024 19.2002 20.04 19.2002H18.6973C18.2349 19.2002 17.8596 18.8135 17.8594 18.3369V16.9512C17.8596 16.4746 18.2349 16.0879 18.6973 16.0879H20.04C20.2631 16.0879 20.4759 15.9967 20.6328 15.835C20.7897 15.672 20.8779 15.4524 20.8779 15.2236V13.8389C20.8781 13.3623 21.2535 12.9756 21.7158 12.9756H23.0596ZM2.17969 12.9746C2.64212 12.9746 3.01749 13.3612 3.01758 13.8379V15.1582H3.02051C3.02051 15.387 3.10875 15.6066 3.26562 15.7695C3.46197 15.973 3.72909 16.0869 4.00781 16.0869H5.13867C5.60102 16.087 5.97645 16.4736 5.97656 16.9502V18.335C5.97656 18.8117 5.60109 19.1991 5.13867 19.1992H3.79492C3.33256 19.1991 2.95703 18.8117 2.95703 18.335V17.1699C2.95703 16.8824 2.84692 16.6079 2.64941 16.4043C2.45311 16.2007 2.186 16.087 1.90723 16.0869H0.837891C0.375401 16.0869 0 15.6995 0 15.2227V13.8379C8.95772e-05 13.3612 0.375456 12.9758 0.837891 12.9746H2.17969ZM10.1045 16.0869C10.5671 16.0869 10.9422 16.4733 10.9424 16.9502V18.334C10.9424 18.811 10.5672 19.1982 10.1045 19.1982H8.7627C8.3 19.1982 7.9248 18.811 7.9248 18.334V16.9502C7.925 16.4733 8.30012 16.0869 8.7627 16.0869H10.1045ZM15.0723 16.0869C15.5347 16.0871 15.91 16.4734 15.9102 16.9502V18.334C15.9102 18.8109 15.5348 19.1981 15.0723 19.1982H13.7295C13.2669 19.1981 12.8916 18.8109 12.8916 18.334V16.9502C12.8918 16.4734 13.267 16.0871 13.7295 16.0869H15.0723ZM15.9277 0C16.3902 0 16.7656 0.387461 16.7656 0.864258V1.95312C16.7657 2.2154 16.867 2.46693 17.0459 2.65137L17.1729 2.78223C17.3517 2.96646 17.5955 3.07028 17.8486 3.07031H18.8721C19.3346 3.07031 19.71 3.45777 19.71 3.93457V12.4414L19.7129 12.4434C19.7129 12.9201 19.3374 13.3075 18.875 13.3076H6.87695C6.41446 13.3076 6.03906 12.9202 6.03906 12.4434V11.2578C6.03906 11.0278 5.95082 10.8082 5.79395 10.6465L5.79004 10.6426C5.56929 10.4152 5.26925 10.2871 4.95801 10.2871H3.94531C3.48292 10.2871 3.10758 9.90048 3.10742 9.42383V0.864258C3.10742 0.387461 3.48282 0 3.94531 0H15.9277ZM6.89844 3.0459C6.43618 3.04616 6.06154 3.43256 6.06152 3.90918V9.15039C6.06153 9.47262 6.18452 9.7802 6.40527 10.0078C6.56331 10.1695 6.7761 10.2607 6.99805 10.2607H15.9199C16.3823 10.2607 16.7577 9.87408 16.7578 9.39746V4.03223C16.7577 3.77 16.6564 3.51839 16.4775 3.33398H16.4785C16.2984 3.14962 16.054 3.0459 15.8008 3.0459H6.89844ZM9.70117 5.31934C10.1635 5.31959 10.5378 5.70596 10.5381 6.18262V7.39258C10.5381 7.86945 10.1637 8.25658 9.70117 8.25684H8.52734C8.06462 8.25684 7.68945 7.86961 7.68945 7.39258V6.18262C7.6897 5.7058 8.06477 5.31934 8.52734 5.31934H9.70117ZM14.2383 5.31934C14.7009 5.31934 15.0759 5.7058 15.0762 6.18262V7.39258C15.0762 7.86961 14.701 8.25684 14.2383 8.25684H13.0645C12.6019 8.25667 12.2266 7.86951 12.2266 7.39258V6.18262C12.2268 5.7059 12.602 5.3195 13.0645 5.31934H14.2383Z";

const loadImage = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

/**
 * Checks if a string contains Chinese characters
 */
const hasChinese = (str) => {
  if (!str) return false;
  return /[\u4e00-\u9fa5]/.test(str.trim());
};

/**
 * Creates the Holographic / Laser Foil Gradient
 */
function createHoloGradient(ctx, x1, y1, x2, y2) {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0.00, '#c4b5fd'); // soft lavender
  grad.addColorStop(0.18, '#818cf8'); // electric violet
  grad.addColorStop(0.36, '#38bdf8'); // sky cyan
  grad.addColorStop(0.52, '#f472b6'); // pastel magenta / pink (tint on 'e')
  grad.addColorStop(0.68, '#ffffff'); // bright holographic glint
  grad.addColorStop(0.84, '#67e8f9'); // aqua teal
  grad.addColorStop(1.00, '#a78bfa'); // purple finish
  return grad;
}

/**
 * Draws the Holographic Octen Mascot + "Octen.AI" Logotype
 */
function drawHoloLogo(ctx, centerX, centerY, scale = 1.0) {
  ctx.save();

  // Measure text
  const fontSize = Math.round(44 * scale);
  ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const text = 'Octen.AI';
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  // Mascot dimensions (SVG viewBox is 24x24, mascot height ~20)
  const iconHeight = 44 * scale;
  const iconScale = iconHeight / 21;
  const iconWidth = 24 * iconScale;
  const gap = 16 * scale;

  const totalWidth = iconWidth + gap + textWidth;
  const startX = centerX - totalWidth / 2;

  // Create Holographic Gradient spanning the entire logo
  const holo = createHoloGradient(
    ctx,
    startX,
    centerY - 24 * scale,
    startX + totalWidth,
    centerY + 24 * scale
  );

  // Subtle Holographic Bloom / Glow
  ctx.shadowColor = 'rgba(244, 114, 182, 0.45)';
  ctx.shadowBlur = 10 * scale;

  // 1. Draw Mascot Icon
  const mascotPath = new Path2D(MASCOT_SVG_PATH);
  ctx.save();
  ctx.translate(startX, centerY - (iconHeight / 2) - 2 * scale);
  ctx.scale(iconScale, iconScale);
  ctx.fillStyle = holo;
  ctx.fill(mascotPath);
  ctx.restore();

  // 2. Draw "Octen.AI" Text
  ctx.fillStyle = holo;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, startX + iconWidth + gap, centerY);

  ctx.restore();
}

/**
 * Renders the front face of the ID badge
 */
export async function createBadgeFront({
  member,
  cardWidth = 1276,
  cardHeight = 2022
}) {
  const canvas = document.createElement('canvas');
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // ==========================================
  // 1. OUTER BLACK SLEEVE / HOLDER (黑色卡套)
  // ==========================================
  ctx.fillStyle = '#0a0a0c'; // Deep matte black silicone
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  // Top slot punching safe-hole guidance / bezel
  ctx.save();
  ctx.fillStyle = '#060608';
  ctx.beginPath();
  ctx.roundRect(cardWidth * 0.3, 36, cardWidth * 0.4, 60, 30);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // ==========================================
  // 2. INNER CARD GEOMETRY & FRAMING
  // ==========================================
  const sleeveMarginX = 68;
  const sleeveMarginTop = 165;
  const sleeveMarginBottom = 68;

  const innerX = sleeveMarginX;
  const innerY = sleeveMarginTop;
  const innerW = cardWidth - sleeveMarginX * 2; // ~888px
  const innerH = cardHeight - sleeveMarginTop - sleeveMarginBottom; // ~1207px
  const cardRadius = 46;

  const bottomBarHeight = 156;
  const bottomBarY = innerY + innerH - bottomBarHeight;
  const whiteAreaH = innerH - bottomBarHeight;

  // ==========================================
  // 3. WHITE CARD UPPER SECTION (中间与上方白色卡面)
  // ==========================================
  ctx.save();
  // Clip to inner card bounds
  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, cardRadius);
  ctx.clip();

  // Fill White Card Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(innerX, innerY, innerW, whiteAreaH + 4);

  // ==========================================
  // 4. NAME BLOCK (姓名 英文 + 小字中文)
  // ==========================================
  const hasZh = hasChinese(member?.nameZh);
  const nameTopY = innerY + (hasZh ? 66 : 82);

  // 4.1 English Name (Bold, Prominent)
  ctx.textAlign = 'center';
  ctx.font = '800 70px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#050505';
  ctx.letterSpacing = '-0.5px';
  ctx.fillText(member?.nameEn || 'Team Member', innerX + innerW / 2, nameTopY + 54);

  // 4.2 Chinese Name (小字中文，间距适中；无中文名字则不显示)
  if (hasZh) {
    const zhSpaced = member.nameZh.trim().split('').join('   ');
    ctx.font = '500 24px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#555861';
    ctx.fillText(zhSpaced, innerX + innerW / 2, nameTopY + 112);
  }

  // ==========================================
  // 5. PHOTO SECTION (中间是图片，无缝衔接至深灰背景条)
  // ==========================================
  if (member?.photoUrl) {
    const img = await loadImage(member.photoUrl);
    if (img) {
      // Photo starts below the name text and extends exactly to bottomBarY
      const photoStartY = innerY + (hasZh ? 185 : 165);
      const photoAvailHeight = bottomBarY - photoStartY;

      // Scale so width fits innerW comfortably and bottom meets the dark bar
      const scale = Math.max(innerW / img.width, photoAvailHeight / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = innerX + (innerW - drawW) / 2;
      // Anchor directly to bottomBarY so shoulders seamlessly rest on bottom bar
      const drawY = bottomBarY - drawH;

      ctx.save();
      // Clip to area between photoStartY and bottomBarY
      ctx.beginPath();
      ctx.rect(innerX, photoStartY, innerW, photoAvailHeight);
      ctx.clip();
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    }
  }

  // ==========================================
  // 6. BOTTOM DARK GREY BAR (深灰色接近黑色的背景条)
  // ==========================================
  // Fill dark grey bar
  ctx.fillStyle = '#1c1e23'; // Dark charcoal, near black
  ctx.fillRect(innerX, bottomBarY, innerW, bottomBarHeight);

  // Subtle top border divider line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(innerX, bottomBarY);
  ctx.lineTo(innerX + innerW, bottomBarY);
  ctx.stroke();

  // ==========================================
  // 7. BOTTOM LOGO WITH HOLOGRAPHIC FOIL (底部logo 镭射效果)
  // ==========================================
  drawHoloLogo(ctx, innerX + innerW / 2, bottomBarY + bottomBarHeight / 2, 1.05);

  ctx.restore(); // Restore inner card clip

  // Subtle inner shadow around inner card sleeve edge to feel like a real silicone case
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, cardRadius);
  ctx.stroke();
  ctx.restore();

  return canvas.toDataURL('image/png');
}

/**
 * Renders the back face of the ID badge
 */
export function createBadgeBack({
  cardWidth = 1276,
  cardHeight = 2022
}) {
  const canvas = document.createElement('canvas');
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Outer Black Sleeve
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  // 2. Inner Card
  const sleeveMarginX = 68;
  const sleeveMarginTop = 165;
  const sleeveMarginBottom = 68;
  const innerX = sleeveMarginX;
  const innerY = sleeveMarginTop;
  const innerW = cardWidth - sleeveMarginX * 2;
  const innerH = cardHeight - sleeveMarginTop - sleeveMarginBottom;
  const cardRadius = 46;

  const bottomBarHeight = 156;
  const bottomBarY = innerY + innerH - bottomBarHeight;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, cardRadius);
  ctx.clip();

  // Dark Tech Back Card
  ctx.fillStyle = '#14161a';
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // Magnetic strip
  ctx.fillStyle = '#000000';
  ctx.fillRect(innerX, innerY + 70, innerW, 110);

  // Security Verification Title
  ctx.textAlign = 'center';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.letterSpacing = '2px';
  ctx.fillText('OCTEN IDENTITY & ACCESS PASS', innerX + innerW / 2, innerY + 260);

  // Terms & Information
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#94a3b8';
  const terms = [
    'This access badge remains property of Octen Inc.',
    'Surrender immediately upon request or employment conclusion.',
    'For emergency access or visitor support, visit: octen.ai'
  ];
  terms.forEach((t, i) => {
    ctx.fillText(t, innerX + innerW / 2, innerY + 315 + i * 34);
  });

  // Simulated QR Code
  const qrSize = 220;
  const qrX = innerX + (innerW - qrSize) / 2;
  const qrY = innerY + 450;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 20);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  const cells = 21;
  const cellSize = qrSize / cells;
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isCorner1 = r < 7 && c < 7;
      const isCorner2 = r < 7 && c >= cells - 7;
      const isCorner3 = r >= cells - 7 && c < 7;
      if (isCorner1 || isCorner2 || isCorner3) {
        const inOuter1 = (r === 0 || r === 6 || c === 0 || c === 6) && isCorner1;
        const inOuter2 = (r === 0 || r === 6 || c === cells - 7 || c === cells - 1) && isCorner2;
        const inOuter3 = (r === cells - 7 || r === cells - 1 || c === 0 || c === 6) && isCorner3;
        const inInner1 = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        const inInner2 = r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3;
        const inInner3 = r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4;
        if (inOuter1 || inOuter2 || inOuter3 || inInner1 || inInner2 || inInner3) {
          ctx.fillRect(qrX + c * cellSize, qrY + r * cellSize, cellSize, cellSize);
        }
      } else if ((r * 13 + c * 7 + (r ^ c)) % 3 === 0) {
        ctx.fillRect(qrX + c * cellSize, qrY + r * cellSize, cellSize, cellSize);
      }
    }
  }

  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('VERIFY AT OCTEN.AI', innerX + innerW / 2, qrY + qrSize + 48);

  // Bottom Dark Grey Bar
  ctx.fillStyle = '#1c1e23';
  ctx.fillRect(innerX, bottomBarY, innerW, bottomBarHeight);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(innerX, bottomBarY);
  ctx.lineTo(innerX + innerW, bottomBarY);
  ctx.stroke();

  // Bottom Holographic Logo
  drawHoloLogo(ctx, innerX + innerW / 2, bottomBarY + bottomBarHeight / 2, 1.05);

  ctx.restore();

  return canvas.toDataURL('image/png');
}

/**
 * Creates the Octen brand woven strap texture with the official Octen mascot & wordmark logo
 */
export async function createOctenStrapTexture({
  color = '#31b934',
  logoUrl = '/brand/logo2.png'
} = {}) {
  const canvas = document.createElement('canvas');
  // Dimensions for React Bits Lanyard strap:
  // width represents length along strap (960px spans the strap for a single non-repeating placement)
  // height is across strap (192px)
  const width = 960;
  const height = 192;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Fill base strap color (default #31b934)
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle strap weave ribbing
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let x = 0; x < width; x += 6) {
    ctx.fillRect(x, 0, 1.5, height);
  }

  // 3. Woven edge stitching borders along strap margins
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fillRect(0, 10, width, 1.5);
  ctx.fillRect(0, height - 11.5, width, 1.5);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(0, 13, width, 1);
  ctx.fillRect(0, height - 14, width, 1);

  // 4. Draw exactly 1 Octen Logo (not arrayed / repeating) near the lower portion above the clamp
  // Rotate -90 degrees so that paintStrap's +90 degree rotation leaves it perfectly upright on the hanging lanyard
  const img = await loadImage(logoUrl);
  if (img) {
    const logoSize = 136; // comfortably fits within 192px height with 28px margins
    ctx.save();
    // Position at width * 0.72 (near the lower portion of the lanyard right above the clamp)
    ctx.translate(width * 0.72, height / 2);
    ctx.rotate(-Math.PI / 2);

    // Compute contrast ink color (white on darker/medium straps like #31b934, black on bright straps)
    let inkColor = '#ffffff';
    try {
      const c = color.trim();
      if (c.startsWith('#')) {
        const hex = c.slice(1);
        const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16) / 255;
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        inkColor = lum > 0.55 ? '#000000' : '#ffffff';
      }
    } catch {}

    const offCanvas = document.createElement('canvas');
    offCanvas.width = img.width;
    offCanvas.height = img.height;
    const octx = offCanvas.getContext('2d');
    if (octx) {
      octx.drawImage(img, 0, 0);
      octx.globalCompositeOperation = 'source-in';
      octx.fillStyle = inkColor;
      octx.fillRect(0, 0, img.width, img.height);
      ctx.drawImage(offCanvas, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
    } else {
      ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
    }
    ctx.restore();
  }

  return canvas.toDataURL('image/png');
}
