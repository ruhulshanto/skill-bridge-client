export default function TutorDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">Tutor Profile</h1>
            <p className="text-muted-foreground">Tutor ID: {params.id}</p>
        </div>
    );
}
