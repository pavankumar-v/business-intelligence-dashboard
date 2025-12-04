import dashboardIcon from '@/assets/duotone-icons/dashboard.svg';
import userIcon from '@/assets/duotone-icons/user.svg';
import paletteIcon from '@/assets/duotone-icons/palette.svg';
import clipboardIcon from '@/assets/duotone-icons/clipboard.svg';
import folderOpenIcon from '@/assets/duotone-icons/folder-open.svg';
import messageIcon from '@/assets/duotone-icons/message-3.svg';
import bellBadgeIcon from '@/assets/duotone-icons/bell-badge.svg';
import currencyEuroIcon from '@/assets/duotone-icons/currency-euro.svg';
import settingsIcon from '@/assets/duotone-icons/settings.svg';
import chartPieIcon from '@/assets/duotone-icons/chart-pie.svg';

type IconProps = {
  width?: number;
  height?: number;
} & React.SVGProps<SVGSVGElement>;
const defaultSize = 20;

const DualToneDashboardIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return (
    <img src={dashboardIcon} width={width} height={height} alt="Dashboard" />
  );
};

const DualToneUserIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return <img src={userIcon} width={width} height={height} alt="User" />;
};

const DualTonePaletteIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return <img src={paletteIcon} width={width} height={height} alt="Palette" />;
};

const DualToneClipboardIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return (
    <img src={clipboardIcon} width={width} height={height} alt="Clipboard" />
  );
};

const DualToneFolderOpenIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return (
    <img src={folderOpenIcon} width={width} height={height} alt="Folder Open" />
  );
};

const DualToneMessageIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return <img src={messageIcon} width={width} height={height} alt="Message" />;
};

const DualToneBellBadgeIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return (
    <img src={bellBadgeIcon} width={width} height={height} alt="Bell Badge" />
  );
};

const DualToneCurrencyEuroIcon = ({
  width = defaultSize,
  height = defaultSize,
}: IconProps) => {
  return (
    <img
      src={currencyEuroIcon}
      width={width}
      height={height}
      alt="Currency Euro"
    />
  );
};

const DualToneSettingsIcon = ({ width = 20, height = 20 }: IconProps) => {
  return (
    <img src={settingsIcon} width={width} height={height} alt="Settings" />
  );
};

const DualToneChartPieIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <img src={chartPieIcon} width={width} height={height} alt="Chart Pie" />
  );
};

export {
  DualToneDashboardIcon,
  DualToneUserIcon,
  DualTonePaletteIcon,
  DualToneClipboardIcon,
  DualToneFolderOpenIcon,
  DualToneMessageIcon,
  DualToneBellBadgeIcon,
  DualToneCurrencyEuroIcon,
  DualToneSettingsIcon,
  DualToneChartPieIcon,
};
