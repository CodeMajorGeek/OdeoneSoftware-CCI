
export default function SummarySubContent({ videoAsset }) {
    return (
    <video key={ videoAsset } controls>
        <source src={ videoAsset } type="video/mp4" />
    </video>)
}