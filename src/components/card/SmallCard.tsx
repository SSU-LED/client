import { CardProps } from "../../types/CardProps";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

function SmallCard({
  imageUrl,
  title,
  id,
  content,
  likeCount,
  commentCount,
  onClick,
}: CardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getFirstChar = (text?: string): string => {
    if (!text || text.length === 0) return "?";
    return text.charAt(0);
  };

  const randomColor = () => {
    return "#cec9c9"; // 회색으로 통일
  };

  // 문자열 길이 제한 함수
  const truncateText = (text?: string, maxLength = 50): string => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={imageContainerStyle}>
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={imageStyle}
            onError={handleImageError}
          />
        ) : (
          <div
            style={{
              ...imageStyle,
              backgroundColor: randomColor(),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {getFirstChar(title)}
          </div>
        )}
      </div>
      <div style={textContainerStyle}>
        <div style={textStyle}>{title ? title : content}</div>
        <div style={contentStyle}>{truncateText(content)}</div>
        <div style={{ ...statsStyle, justifyContent: "flex-end" }}>
          <span style={statItemStyle}>
            <FaHeart /> {likeCount || 0}
          </span>
          <span style={statItemStyle}>
            <IoChatboxEllipsesOutline /> {commentCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "left",
  gap: "8px",
  padding: "5px 8px",
  width: "100%",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

const imageContainerStyle: React.CSSProperties = {
  position: "relative",
  flexShrink: 0,
  width: "56px",
  height: "56px",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "16px",
};

const textContainerStyle: React.CSSProperties = {
  position: "relative", // 추가
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

const textStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "4px",
};

const contentStyle = {
  fontSize: "14px",
  color: "#555",
  marginBottom: "4px",
  height: "40px",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
} as React.CSSProperties;

const statsStyle: React.CSSProperties = {
  position: "absolute", // 겹쳐지도록
  bottom: 0,
  right: 0,
  display: "flex",
  gap: "10px",
  fontSize: "12px",
  color: "#666",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // 선택적으로 가독성 보장
  padding: "2px 0px",
  borderRadius: "8px 0 0 0",
};

const statItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "3px",
};
