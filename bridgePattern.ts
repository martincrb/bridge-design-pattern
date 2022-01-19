//  ABSTRACCIONES
abstract class ListItemView {
    viewModel: IViewModel; // <- ESTO ES EL BRIDGE!

    constructor(viewModel: IViewModel) {
        this.viewModel = viewModel;
    }

    render(): void {
        console.log('default abstract render');
    }
}

interface IViewModel {
    title(): String;
    image(): String;
}

// CONCRECIONES
class WithThumbnailListItemView extends ListItemView {
    render() {
        console.log('------------------------------------------')
        console.log(`Here render amazing thumbnail: ${this.viewModel.image()}`)
        console.log(`${this.viewModel.title()}`);
        console.log('------------------------------------------')
        console.log(' ')
    }
}

class JustTextListItemView extends ListItemView {
    render() {
        console.log('------------------------------------------')
        console.log(`Just render title: ${this.viewModel.title()}`);
        console.log('------------------------------------------')
        console.log(' ')
    }
}

class VideoViewModel implements IViewModel {
    video: any;

    constructor(video: any) {
        this.video = video;
    }

    title(): String {
        return `(VIDEO) ${this.video.title}`;
    }
    image(): String {
        return `(VIDEO) ${this.video.image}`;
    }
    
}

class StreamViewModel implements IViewModel {
    stream: any;

    constructor(stream: any) {
        this.stream = stream;
    }

    title(): String {
        return `(STREAM) ${this.stream.title} Currently Viewing ${this.stream.viewers}`;
    }
    image(): String {
        return `(STREAM) ${this.stream.image}`;
    }
    
}

// TESTING BRIDGE PATTERN, JUST FOR SHOWING HOW IT BEHAVES
const content = [
    {
        type:  'video',
        title: 'Egoland 2: Tirando misiles',
        image: 'Amazing image'
    },
    {
        type:  'stream',
        title: 'JUGANDO A POKÉMON, UNANSE!',
        image: 'Amazing image',
        viewers: 10
    },
    {
        type:  'stream',
        title: 'SÚPER EXTENSIBLE PROGRAMANDO UNA SUB UN BUG',
        image: 'Amazing image',
        viewers: 12034
    },
    {
        type:  'video',
        title: 'Campanadas Ibai 2034',
        image: 'Amazing image'
    },
    {
        type:  'video',
        title: 'Jorge Salvaje programando un Eroge',
        image: 'Amazing image'
    }
];

const listViews: ListItemView[] = [];
for (let item of content) {
    
    if (item.type === 'video') { // JUST FOR TESTING, THIS CAN BE SOLVED USING TYPES OR OTHER PATTERNS
        listViews.push(
            Math.random() > 0.5 ? 
        new WithThumbnailListItemView(new VideoViewModel(item)) :
        new JustTextListItemView(new VideoViewModel(item)));
    } else if (item.type === 'stream') {
        listViews.push(
            Math.random() > 0.5 ? 
        new WithThumbnailListItemView(new StreamViewModel(item)) :
        new JustTextListItemView(new StreamViewModel(item)));
    }
}

for (let view of listViews) {
    view.render();
}