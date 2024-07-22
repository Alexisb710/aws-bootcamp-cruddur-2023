import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./svg/home.svg";
import { ReactComponent as NotificationsIcon } from "./svg/notifications.svg";
import { ReactComponent as ProfileIcon } from "./svg/profile.svg";
import { ReactComponent as MoreIcon } from "./svg/more.svg";
import { ReactComponent as MessagesIcon } from "./svg/messages.svg";
import { useParams } from "react-router-dom";

export default function DesktopNavigationLink(props) {
  const params = useParams();
  console.log("start [error]::");
  console.log("this is the params.handle value: ", params.handle);
  console.log("end [error]::");
  const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/@${params.handle}`;
  console.log("this is the backend_url value: ", backend_url);

  const classes = () => {
    const classes = ["primary"];
    if (props.handle === props.active) {
      classes.push("active");
    }
    return classes.join(" ");
  };

  const icon = () => {
    switch (props.handle) {
      case "home":
        return <HomeIcon className="icon" />;
      case "notifications":
        return <NotificationsIcon className="icon" />;
      case "profile":
        return <ProfileIcon className="icon" />;
      case "more":
        return <MoreIcon className="icon" />;
      case "messages":
        return <MessagesIcon className="icon" />;
      default:
        return null; // Optionally handle default case
    }
  };

  console.log("start [error]::");
  console.log("this is the props.url value: ", props.url);
  console.log("this is the props.name value: ", props.name);
  console.log("end [error]::");
  return (
    <Link to={props.url} className={classes()} href="#">
      {icon()}
      <span>{props.name}</span>
    </Link>
  );
}
