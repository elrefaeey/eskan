interface UnitInfoItemProps {
  label: string;
  value: string | number;
}

const UnitInfoItem = ({ label, value }: UnitInfoItemProps) => (
  <p className="text-body-base sm:text-[1.02em] xl:text-lg">
    <span className="font-semibold">{label}</span> : {value}
  </p>
);

export default UnitInfoItem;
