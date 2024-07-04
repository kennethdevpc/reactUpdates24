type Props = {
  data: string[];
};

function List({ data }: Props) {
  return (
    <div>
      <ul className="list-group">
        {data.map((elemento) => (
          <li key={elemento} className="list-group-item">
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
