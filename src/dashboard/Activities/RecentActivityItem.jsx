export default function RecentActivityItem({ user, action, time }) {
  return (
    <div className="flex justify-between items-center p-3 bg-bg border border-muted rounded-lg hover:bg-primary/5 transition-colors duration-200">
      <div>
        <p className="text-text">
          <span className="font-semibold">{user}</span> {action}
        </p>
      </div>
      <p className="text-sm text-muted">{time}</p>
    </div>
  );
}
