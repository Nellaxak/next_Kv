import Item from './Item'

export default interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    item: Item;
}