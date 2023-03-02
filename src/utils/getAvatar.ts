import noAvatar from '../../static/img/no-pic.svg';

export function getAvatar (avatar: string | null): string | SVGElement {
    return (avatar === null || avatar === '') ? noAvatar : `https://ya-praktikum.tech/api/v2/resources/${avatar}`;
}
